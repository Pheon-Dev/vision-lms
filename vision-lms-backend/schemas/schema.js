// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import user from './user'
import member from './member'
import comment from './comment'
import postedBy from './postedBy'
import save from './save'
import newProduct from './newProduct'
import maintenance from './maintenance'
import collateral from './collateral'
import guarantor from './guarantor'
import preview from './preview'
import approve from './approve'
import disburse from './disburse'
import groups from './groups'
import groupMembers from './groupMembers'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    user,
    member,
    groups,
    groupMembers,
    newProduct,
    maintenance,
    preview,
    approve,
    disburse,
    collateral,
    guarantor,
    comment,
    postedBy,
    save,
  ]),
})
