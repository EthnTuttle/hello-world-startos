import { sdk } from '../../sdk'
import { setInterfaces } from '../interfaces'
import { configSpec } from './spec'

/**
 * This function executes on config save
 *
 * Use it to persist config data to various files and to establish any resulting dependencies
 */
export const save = sdk.setupConfigSave(
  configSpec,
  async ({ effects, utils, input, dependencies }) => {
    // save data wherever you want
    await utils.store.setOwn('/config', input)

    // set current dependencies based on config settings
    const dependenciesReceipt = await effects.setDependencies([])

    return {
      interfacesReceipt: await setInterfaces({ effects, utils, input }), // This is plumbing, don't touch it
      dependenciesReceipt,
      restart: true,
    }
  },
)
