// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import user from './user';
import member from './member';
// import comment from './comment'
// import postedBy from './postedBy'
import recentPayments from './recentPayments';
import transactions from './transactions';
import maintenance from './maintenance';
import collateral from './collateral';
import newProduct from './newProduct';
import guarantor from './guarantor';
import disburse from './disburse';
import payments from './payments';
import approve from './approve';
import groups from './groups';
// import groupMembers from './groupMembers'

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
    // groupMembers,
    newProduct,
    transactions,
    maintenance,
    approve,
    disburse,
    payments,
    recentPayments,
    collateral,
    guarantor,
    // comment,
    // postedBy,
  ]),
});
