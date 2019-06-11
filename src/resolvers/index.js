import { extractFragmentReplacements } from 'prisma-binding';

import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import Customs from './customs';

const resolvers = {
    Query,
    Mutation,
    ...Customs,
    Subscription
} 

const fragmentReplacements = extractFragmentReplacements(resolvers)

export {
  resolvers,
  fragmentReplacements
}