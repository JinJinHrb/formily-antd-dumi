import baseConfig, { removeImportStyleFromInputFilePlugin } from './scripts/rollup.base.js'
import { getRollupBasePlugin } from './scripts/build-style/plugin.js'

export default baseConfig('formily.antd.dumi', 'Formily.Antd.Dumi', [
	removeImportStyleFromInputFilePlugin(),
	...getRollupBasePlugin(),
])
