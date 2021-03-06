// @flow

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {|
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
|};


export type Query = {|
  __typename?: 'Query',
  user?: ?User,
  greeting?: ?$ElementType<Scalars, 'String'>,
  counter?: ?$ElementType<Scalars, 'Float'>,
|};

export type Mutation = {|
  __typename?: 'Mutation',
  increaseCounter?: ?$ElementType<Scalars, 'Float'>,
|};


export type MutationIncreaseCounterArgs = {|
  amount: $ElementType<Scalars, 'Float'>,
|};

export type User = {|
  __typename?: 'User',
  id?: ?$ElementType<Scalars, 'String'>,
  firstName?: ?$ElementType<Scalars, 'String'>,
  lastName?: ?$ElementType<Scalars, 'String'>,
  fullName?: ?$ElementType<Scalars, 'String'>,
|};

export const CacheControlScopeValues = Object.freeze({
  Public: 'PUBLIC',
  Private: 'PRIVATE'
});


export type CacheControlScope = $Values<typeof CacheControlScopeValues>;


type $Pick<Origin: Object, Keys: Object> = $ObjMapi<Keys, <Key>(k: Key) => $ElementType<Origin, Key>>;
