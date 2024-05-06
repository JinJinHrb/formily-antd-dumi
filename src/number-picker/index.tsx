import { connect, mapReadPretty } from '@formily/react'
import { PreviewText } from '../preview-text'
import InputNumber from './MyComponent'

export const NumberPicker = connect(InputNumber, mapReadPretty(PreviewText.Input))
