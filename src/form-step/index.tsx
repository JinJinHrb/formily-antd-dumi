import React, { Fragment, useEffect } from 'react'
import { define, observable, action, markRaw, model } from '@formily/reactive'
import cls from 'classnames'
import Steps, { StepsProps, StepProps } from 'antd/es/steps'
import { Form, VoidField as VoidFieldType } from '@formily/core'
import { connect, useField, observer, useFieldSchema, RecursionField, VoidField, useForm } from '@formily/react'
import { Schema, SchemaKey } from '@formily/json-schema'
import { usePrefixCls } from '../__builtins__'
import { useFormInfo } from '../form/context'

export interface IFormStep {
	connect: (steps: Step[], field: VoidFieldType, form: Form) => void
	current: number
	allowNext: boolean
	allowBack: boolean
	setCurrent(key: number): void
	submit: Form['submit']
	next(): void
	back(): void
}

export interface IFormStepProps extends StepsProps {
	formStep?: IFormStep
}

type ComposedFormStep = React.FC<React.PropsWithChildren<IFormStepProps>> & {
	StepPane: React.FC<React.PropsWithChildren<StepProps>>
	createFormStep: (defaultCurrent?: number) => IFormStep
}

type Step = {
	name: SchemaKey
	props: any
	schema?: Schema
	children?: React.ReactNode
}

type FormStepEnv = {
	form: Form
	field?: VoidFieldType
	steps: Step[]
}

function toArray<T>(value: T | T[]): T[] {
	if (Array.isArray(value)) {
		return value
	}
	return value !== undefined ? [value] : []
}

const parseSchemaSteps = (schema: Schema) => {
	const steps: Step[] = []
	schema.mapProperties((schema, name) => {
		if (schema['x-component']?.indexOf('StepPane') > -1) {
			steps.push({
				name,
				props: schema['x-component-props'],
				schema,
			})
		}
	})
	return steps
}

const parseChildrenSteps = (children: React.ReactNode) => {
	return (
		React.Children.map(toArray(children), (node, index: number): Step | null => {
			if (!React.isValidElement(node) || !node.type) {
				return null
			}

			const {
				key,
				props: { children, ...restProps },
			} = node as React.ReactElement & {
				type: { isFormStep?: boolean }
			}

			return {
				name: `__FOEM_STEP_GRP__${key === null ? index : key}__`,
				props: restProps,
				children: children,
			}
		})?.filter(data => data) || []
	)
}

const createFormStep = (defaultCurrent = 0): IFormStep => {
	const env: FormStepEnv = define({
		form: null,
		field: null,
		steps: [],
	}, {
		form: observable.ref,
		field: observable.ref,
		steps: observable.shallow,
	})

	const setDisplay = action.bound((target: number) => {
		const currentStep = env.steps[target]
		env.steps.forEach(({ name }) => {
			const parretn = env.field ? `${env.field.address}.${name}` : name
			env.form.query(parretn).take(field => {
				if (name === currentStep.name) {
					field.setDisplay('visible')
				} else {
					field.setDisplay('hidden')
				}
			})
		})
	})

	const next = action.bound(() => {
		if (formStep.allowNext) {
			formStep.setCurrent(formStep.current + 1)
		}
	})

	const back = action.bound(() => {
		if (formStep.allowBack) {
			formStep.setCurrent(formStep.current - 1)
		}
	})

	const formStep: IFormStep = model({
		connect(steps, field, form) {
			env.steps = steps
			env.form = field?.form || form
			env.field = field
		},
		current: defaultCurrent,
		setCurrent(key: number) {
			setDisplay(key)
			formStep.current = key
		},
		get allowNext() {
			return formStep.current < env.steps.length - 1
		},
		get allowBack() {
			return formStep.current > 0
		},
		async next() {
			try {
				await env.form.validate()
				if (env.form.valid) {
					next()
				}
			} catch {}
		},
		async back() {
			back()
		},
		async submit(onSubmit) {
			return env.form?.submit?.(onSubmit)
		},
	})
	return markRaw(formStep)
}

export const FormStep = (connect(
	observer(({ formStep, className, children, ...props }: IFormStepProps) => {
		const field = useField<VoidFieldType>()
		const form = useForm()
		const prefixCls = usePrefixCls('formily-step', props)
		const schema = useFieldSchema()

		let steps: Step[] = []
		if (schema) {
			steps = parseSchemaSteps(schema)
		} else {
			steps = parseChildrenSteps(children)
		}
		const formInfo = useFormInfo()

		useEffect(() => {
			if (formInfo && formInfo.fixedWidth) {
				formInfo.setFixContainerWidth?.(false)
			}
		}, [formInfo?.fixedWidth])

		const current = props.current || formStep?.current || 0
		formStep?.connect?.(steps, field, form)
		return (
			<div className={cls(prefixCls, className)}>
				<Steps {...props} style={props.style} current={current}>
					{steps.map(({ props }, key) => {
						return <Steps.Step {...props} key={key} />
					})}
				</Steps>
				<div className={`${prefixCls}-content`} style={{ width: formInfo?.fixedWidth }}>
					{steps.map(({ name, schema, children }, key) => {
						if (key !== current) return
						if (schema) {
							return <RecursionField key={key} name={name} schema={schema} />
						} else {
							return (
								<VoidField key={name} name={name}>
									{children}
								</VoidField>
							)
						}
					})}
				</div>
			</div>
		)
	}),
) as unknown) as ComposedFormStep

const StepPane: React.FC<React.PropsWithChildren<StepProps>> = ({ children }) => {
	return <Fragment>{children}</Fragment>
}

FormStep.StepPane = StepPane
FormStep.createFormStep = createFormStep

export default FormStep
