/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findMetadataPda } from '../accounts';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type RevokeCollectionAuthorityInstructionAccounts = {
  /** Collection Authority Record PDA */
  collectionAuthorityRecord: PublicKey | Pda;
  /** Delegated Collection Authority */
  delegateAuthority: PublicKey | Pda;
  /** Update Authority, or Delegated Authority, of Collection NFT */
  revokeAuthority: Signer;
  /** Metadata account */
  metadata?: PublicKey | Pda;
  /** Mint of Metadata */
  mint: PublicKey | Pda;
};

// Data.
export type RevokeCollectionAuthorityInstructionData = {
  discriminator: number;
};

export type RevokeCollectionAuthorityInstructionDataArgs = {};

export function getRevokeCollectionAuthorityInstructionDataSerializer(): Serializer<
  RevokeCollectionAuthorityInstructionDataArgs,
  RevokeCollectionAuthorityInstructionData
> {
  return mapSerializer<
    RevokeCollectionAuthorityInstructionDataArgs,
    any,
    RevokeCollectionAuthorityInstructionData
  >(
    struct<RevokeCollectionAuthorityInstructionData>(
      [['discriminator', u8()]],
      { description: 'RevokeCollectionAuthorityInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 24 })
  ) as Serializer<
    RevokeCollectionAuthorityInstructionDataArgs,
    RevokeCollectionAuthorityInstructionData
  >;
}

// Instruction.
export function revokeCollectionAuthority(
  context: Pick<Context, 'eddsa' | 'programs'>,
  input: RevokeCollectionAuthorityInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    collectionAuthorityRecord: {
      index: 0,
      isWritable: true,
      value: input.collectionAuthorityRecord ?? null,
    },
    delegateAuthority: {
      index: 1,
      isWritable: true,
      value: input.delegateAuthority ?? null,
    },
    revokeAuthority: {
      index: 2,
      isWritable: true,
      value: input.revokeAuthority ?? null,
    },
    metadata: { index: 3, isWritable: false, value: input.metadata ?? null },
    mint: { index: 4, isWritable: false, value: input.mint ?? null },
  };

  // Default values.
  if (!resolvedAccounts.metadata.value) {
    resolvedAccounts.metadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data =
    getRevokeCollectionAuthorityInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
