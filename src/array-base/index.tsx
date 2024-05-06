import React, { createContext, useContext, MouseEventHandler } from 'react'
import Button from 'antd/es/button'
import { ButtonProps } from 'antd/es/button'
import { ArrayField } from '@formily/core'
import { useField, useFieldSchema, Schema, JSXComponent, ExpressionScope } from '@formily/react'
import { isValid, clone, isBool } from '@formily/shared'
import { SortableHandle } from 'react-sortable-hoc'
import { BaseArrayContext, usePrefixCls } from '../__builtins__'
import { isNumber } from 'lodash-es'
import Popconfirm, { PopconfirmProps } from 'antd/es/popconfirm'
import classNames from 'classnames'
import {
  MenuOutlined, PlusOutlined, DeleteOutlined, DownOutlined,
  UpOutlined, EditOutlined, LeftSquareOutlined
} from '@ant-design/icons'
import cls from 'classnames'

export interface IArrayBaseAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift' | 'insert'
  defaultValue?: any
  buttonType: ButtonProps['type']
  noIcon?: boolean
  iconProps?: any
}
export interface IArrayBaseContext {
  props: IArrayBaseProps
  field: ArrayField
  schema: Schema
}
export interface IArrayBaseItemProps {
  index: number
  record: any
  children?: React.ReactNode
}
type AntdIconProps = any
export type ArrayBaseMixins = {
  Addition?: React.FC<IArrayBaseAdditionProps>
  Remove?: React.FC<
    AntdIconProps & {
      index?: number
      atLeastOne: boolean
    }
  >
  PopconfirmRemove?: React.FC<
    PopconfirmProps & {
      deleteIcon?: React.ReactNode
      description?: string
      atLeastOne: boolean
      index?: number
    }
  >
  Hide?: React.FC<
    AntdIconProps & {
      index?: number
    }
  >
  MoveUp?: React.FC<
    AntdIconProps & {
      index?: number
    }
  >
  MoveDown?: React.FC<
    AntdIconProps & {
      index?: number
    }
  >
  Edit?: React.FC<
    AntdIconProps & {
      index?: number
      clickFactory: ({ index, record, array }) => MouseEventHandler<HTMLSpanElement>
    }
  >
  SortHandle?: React.FC<
    AntdIconProps & {
      index?: number
    }
  >
  Index?: React.FC<{
    title: React.ReactNode
  }>
  useArray?: () => IArrayBaseContext | null
  useIndex?: () => number | void
  useRecord?: () => any
}
export interface IArrayBaseProps {
  disabled?: boolean
  onAdd?: (index: number) => void
  onRemove?: (index: number) => void
  onMoveDown?: (index: number) => void
  onMoveUp?: (index: number) => void
  Edit?: (index: number) => void
  empty?: React.ReactNode
  children?: React.ReactNode
}
export interface IArrayDelOnClickArgs {
  e: React.MouseEvent<HTMLElement>
  array: IArrayBaseContext
  index: number
}
type ComposedArrayBase = React.FC<IArrayBaseProps> &
  ArrayBaseMixins & {
    Item?: React.FC<IArrayBaseItemProps>
    mixin?: <T extends JSXComponent>(target: T) => T & ArrayBaseMixins
  }
const ArrayBaseContext = createContext<IArrayBaseContext | null>(null)
const ItemContext = createContext<IArrayBaseItemProps | null>(null)
const useArray = () => {
  return useContext(ArrayBaseContext)
}
const useIndex = (index?: number) => {
  const ctx = useContext(ItemContext)
  return ctx ? ctx.index : index
}
const useRecord = (record?: number) => {
  const ctx = useContext(ItemContext)
  return ctx ? ctx.record : record
}
const getSchemaDefaultValue = (schema: Schema) => {
  if (schema?.type === 'array') return []
  if (schema?.type === 'object') return {}
  if (schema?.type === 'boolean') return true
  if (schema?.type === 'date') return ''
  if (schema?.type === 'datetime') return ''
  if (schema?.type === 'number') return 0
  if (schema?.type === 'string') return ''
  if (schema?.type === 'void') {
    for (let key in schema.properties) {
      const value = getSchemaDefaultValue(schema.properties[key])
      if (isValid(value)) return value
    }
  }
}
const getDefaultValue: any = (defaultValue: any, schema: Schema) => {
  if (isValid(defaultValue)) return clone(defaultValue)
  const itemsType = (
    schema?.items as
    | undefined
    | {
      type: string
    }
  )?.type
  if (itemsType === 'array') return []
  if (itemsType === 'boolean') return true
  if (itemsType === 'date') return ''
  if (itemsType === 'datetime') return ''
  if (itemsType === 'number') return 0
  if (itemsType === 'object') return {}
  if (itemsType === 'string') return ''
  if (Array.isArray(schema?.items)) return getSchemaDefaultValue(schema.items[0])
  if (schema?.items) return getSchemaDefaultValue(schema.items)
  return undefined
}
export const ArrayBase: ComposedArrayBase = (props: React.PropsWithChildren<IArrayBaseProps>) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  return (
    <ArrayBaseContext.Provider
      value={{
        field,
        schema,
        props,
      }}>
      {props.children}
    </ArrayBaseContext.Provider>
  )
}
ArrayBase.Item = (props: React.PropsWithChildren<IArrayBaseItemProps>) => {
  return (
    <ItemContext.Provider value={props}>
      <ExpressionScope
        value={{
          $record: props.record,
          $index: props.index,
        }}>
        {props.children}
      </ExpressionScope>
    </ItemContext.Provider>
  )
}
const SortHandle = SortableHandle((props: any) => {
  const prefixCls = usePrefixCls('formily-array-base')
  return (
    <MenuOutlined
      {...props}
      className={cls(`${prefixCls}-sort-handle`, props.className)}
      style={{
        ...props.style,
      }}
    />
  )
}) as any
const InternalSortHandle: typeof ArrayBase.SortHandle = props => {
  const array = useArray()
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return <SortHandle {...props} />
}
ArrayBase.SortHandle = InternalSortHandle
const Index: typeof ArrayBase.Index = props => {
  const index = useIndex()
  const prefixCls = usePrefixCls('formily-array-base')
  const { title, ...restProps } = props
  return (
    <span {...restProps} className={`${prefixCls}-index`}>
      {title}
      {index + 1}
    </span>
  )
}
ArrayBase.Index = Index
const Addition: typeof ArrayBase.Addition = params => {
  const { buttonType = 'dashed', noIcon, iconProps, ...props } = params
  const self = useField()
  const array = useArray()
  const index = useIndex() || 0
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (array.field?.pattern !== 'editable' && array.field?.pattern !== 'disabled') return null
  let disabled = isBool(self?.disabled) ? self?.disabled : array.field?.disabled
  const maxLength = array?.schema.maxLength
  const value = array?.field.value
  let maxLengthMsg = ''
  if (maxLength && (value?.length || 0) >= maxLength) {
    disabled = true
    maxLengthMsg = `(最多添加{${maxLength}}个)`
  }
  return (
    <Button
      type={buttonType}
      block
      {...props}
      disabled={disabled || !!props?.disabled}
      className={cls(`${prefixCls}-addition`, props.className)}
      onClick={e => {
        if (array.props?.disabled) return
        if (props.onClick) {
          const resultOnClick = props.onClick(e) as boolean | void
          if (!resultOnClick) {
            return
          }
        }
        const defaultValue = getDefaultValue(props.defaultValue, array.schema)
        if (props.method === 'unshift') {
          array.field?.unshift?.(defaultValue)
          array.props?.onAdd?.(0)
        } else if (props.method === 'insert') {
          array.field?.insert?.(index + 1, defaultValue)
          array.props?.onAdd?.(index + 1)
        } else {
          array.field?.push?.(defaultValue)
          array.props?.onAdd?.(array?.field?.value?.length - 1)
        }
      }}
      icon={noIcon ? null : <PlusOutlined {...iconProps} />}>
      {props.title || self.title} {maxLengthMsg}
    </Button>
  )
}
ArrayBase.Addition = Addition

/*
 * atLeastOne 和 minItems 用法需要说明
 */
ArrayBase.Remove = React.forwardRef((props, ref) => {
  const { atLeastOne, triggerNode, ...restProps } = props
  const baseArrayContext = useContext(BaseArrayContext)
  const isSingleItemDisabled = baseArrayContext.isSingleItemDisabled as boolean
  const index = useIndex(props.index)
  const array = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array || (atLeastOne && index === 0)) return null
  if (array.field?.pattern !== 'editable') return null

  // x-validators 中存在 "minItems: 1" 时，仅存一行时不展示删除按钮
  const value = array.field.form.query(array.field.path.toString()).get('value')
  const valueLength = Array.isArray(value) ? value.length : 1
  const minItems = Array.isArray(array.field.validator)
    ? array.field.validator.filter(a => isNumber((a as any)?.minItems))?.[0]?.['minItems'] || 0
    : 0
  if (valueLength < minItems + 1) {
    return null
  }
  const isDisabled = array.props?.disabled || isSingleItemDisabled
  const removeProps = {
    ...restProps,
    className: cls(`${prefixCls}-remove`, isDisabled ? `${prefixCls}-remove-disabled` : '', props.className),
    ref: ref,
    onClick: e => {
      if (isDisabled) return
      e.stopPropagation()
      if (props.onClick) {
        const args: IArrayDelOnClickArgs = {
          e,
          array,
          index: index || 0,
        }
        props.onClick(args)
        return
      }
      array.field?.remove?.(index)
      array.props?.onRemove?.(index)
    },
  }
  return (
    <>
      {triggerNode ? (
        React.cloneElement(triggerNode, {
          ...removeProps,
          ...triggerNode.props,
        })
      ) : (
        <DeleteOutlined {...removeProps} />
      )}
    </>
  )
})
ArrayBase.PopconfirmRemove = React.forwardRef(
  (
    props: PopconfirmProps & {
      description?: string
      deleteIcon?: React.ReactNode
      atLeastOne: boolean
      index?: number
    },
    // ref,
  ) => {
    const {
      deleteIcon,
      atLeastOne,
      title = '确定要删除吗？',
      description = '删除后将不可恢复。',
      okText = '确定',
      overlayClassName,
      cancelText = '取消',
      placement = 'left',
      okButtonProps,
      cancelButtonProps,
      ...resetProps
    } = props || {}
    const index = useIndex(props.index)
    const array = useArray()
    const prefixCls = usePrefixCls('formily-array-base')
    if (!array || (atLeastOne && index === 0)) return null
    if (array.field?.pattern !== 'editable') return null
    const value = array.field.form.query(array.field.path.toString()).get('value')
    const valueLength = Array.isArray(value) ? value.length : 1
    const minItems = Array.isArray(array.field.validator)
      ? array.field.validator.filter(a => isNumber((a as any)?.minItems))?.[0]?.['minItems'] || 0
      : 0
    if (valueLength < minItems + 1) {
      return null
    }
    const isDisabled = array.props?.disabled
    const confrim = () => {
      if (isDisabled) return
      array.field?.remove?.(index)
      array.props?.onRemove?.(index)
    }
    return (
      <Popconfirm
        title={
          <div>
            <div className={`${prefixCls}-pop-confirm-remove-title`}>
              {typeof title === 'function' ? title() : title}
            </div>
            {description && <div className={`${prefixCls}-pop-confirm-remove-description`}>{description}</div>}
          </div>
        }
        okText={okText}
        cancelText={cancelText}
        onConfirm={confrim}
        overlayClassName={classNames(overlayClassName, `${prefixCls}-pop-confirm-remove-overlay`)}
        getPopupContainer={triggerNode => triggerNode.parentElement as HTMLElement}
        placement={placement}
        okButtonProps={{
          className: `${prefixCls}-pop-confirm-remove-btn`,
          ...okButtonProps,
        }}
        cancelButtonProps={{
          className: `${prefixCls}-pop-confirm-remove-btn`,
          ...cancelButtonProps,
        }}
        {...resetProps}>
        {deleteIcon ? (
          deleteIcon
        ) : (
          <DeleteOutlined
            className={cls(
              `${prefixCls}-remove`,
              isDisabled ? `${prefixCls}-remove-disabled` : '',
              props.className,
            )} />
        )}
      </Popconfirm>
    )
  },
)
ArrayBase.Hide = React.forwardRef((props, ref) => {
  const index = useIndex(props.index)
  const array = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <LeftSquareOutlined
      {...props}
      className={cls(`${prefixCls}-remove`, props.className)}
      ref={ref}
      onClick={e => {
        if (array.props?.disabled) return
        e.stopPropagation()
        if (props.onClick) {
          const args: IArrayDelOnClickArgs = {
            e,
            array,
            index: index || 0,
          }
          props.onClick(args)
          return
        }
        array.field?.remove?.(index)
        array.props?.onRemove?.(index)
      }}
    />
  )
})
ArrayBase.MoveDown = React.forwardRef((props, ref) => {
  const index = useIndex(props.index)
  const array = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <DownOutlined
      {...props}
      className={cls(`${prefixCls}-move-down`, props.className)}
      ref={ref}
      onClick={e => {
        if (array.props?.disabled) return
        e.stopPropagation()
        array.field?.moveDown?.(index)
        array.props?.onMoveDown?.(index)
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    />
  )
})
ArrayBase.MoveUp = React.forwardRef((props, ref) => {
  const index = useIndex(props.index)
  const array = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <UpOutlined
      {...props}
      className={cls(`${prefixCls}-move-up`, props.className)}
      ref={ref}
      onClick={e => {
        if (array.props?.disabled) return
        e.stopPropagation()
        array?.field?.moveUp(index)
        array?.props?.onMoveUp?.(index)
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    />
  )
})
ArrayBase.Edit = React.forwardRef((props, ref) => {
  const { clickFactory, ...otherProps } = props
  const index = useIndex(otherProps.index)
  const record = useRecord()
  const array = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!record) return null
  if (typeof clickFactory !== 'function') return null
  const clickHandler = clickFactory({
    index,
    record,
    array,
  })
  if (typeof clickHandler !== 'function') return null
  return (
    <EditOutlined
      {...otherProps}
      className={cls(`${prefixCls}-edit`, otherProps.className)}
      ref={ref}
      onClick={clickHandler}
    />
  )
})
ArrayBase.useArray = useArray
ArrayBase.useIndex = useIndex
ArrayBase.useRecord = useRecord
ArrayBase.mixin = (target: any) => {
  target.Index = ArrayBase.Index
  target.SortHandle = ArrayBase.SortHandle
  target.Addition = ArrayBase.Addition
  target.Remove = ArrayBase.Remove
  target.PopconfirmRemove = ArrayBase.PopconfirmRemove
  target.Hide = ArrayBase.Hide
  target.MoveDown = ArrayBase.MoveDown
  target.MoveUp = ArrayBase.MoveUp
  target.Edit = ArrayBase.Edit
  target.useArray = ArrayBase.useArray
  target.useIndex = ArrayBase.useIndex
  target.useRecord = ArrayBase.useRecord
  return target
}
