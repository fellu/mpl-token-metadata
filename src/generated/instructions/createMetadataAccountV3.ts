/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Option,
  OptionOrNullable,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  bool,
  mapSerializer,
  option,
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
import {
  CollectionDetails,
  CollectionDetailsArgs,
  DataV2,
  DataV2Args,
  getCollectionDetailsSerializer,
  getDataV2Serializer,
} from '../types';

// Accounts.
export type CreateMetadataAccountV3InstructionAccounts = {
  /** Metadata key (pda of ['metadata', program id, mint id]) */
  metadata?: PublicKey | Pda;
  /** Mint of token asset */
  mint: PublicKey | Pda;
  /** Mint authority */
  mintAuthority: Signer;
  /** payer */
  payer?: Signer;
  /** update authority info */
  updateAuthority?: PublicKey | Pda | Signer;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Rent info */
  rent?: PublicKey | Pda;
};

// Data.
export type CreateMetadataAccountV3InstructionData = {
  discriminator: number;
  data: DataV2;
  isMutable: boolean;
  collectionDetails: Option<CollectionDetails>;
};

export type CreateMetadataAccountV3InstructionDataArgs = {
  data: DataV2Args;
  isMutable: boolean;
  collectionDetails: OptionOrNullable<CollectionDetailsArgs>;
};

export function getCreateMetadataAccountV3InstructionDataSerializer(): Serializer<
  CreateMetadataAccountV3InstructionDataArgs,
  CreateMetadataAccountV3InstructionData
> {
  return mapSerializer<
    CreateMetadataAccountV3InstructionDataArgs,
    any,
    CreateMetadataAccountV3InstructionData
  >(
    struct<CreateMetadataAccountV3InstructionData>(
      [
        ['discriminator', u8()],
        ['data', getDataV2Serializer()],
        ['isMutable', bool()],
        ['collectionDetails', option(getCollectionDetailsSerializer())],
      ],
      { description: 'CreateMetadataAccountV3InstructionData' }
    ),
    (value) => ({ ...value, discriminator: 33 })
  ) as Serializer<
    CreateMetadataAccountV3InstructionDataArgs,
    CreateMetadataAccountV3InstructionData
  >;
}

// Args.
export type CreateMetadataAccountV3InstructionArgs =
  CreateMetadataAccountV3InstructionDataArgs;

// Instruction.
export function createMetadataAccountV3(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: CreateMetadataAccountV3InstructionAccounts &
    CreateMetadataAccountV3InstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    metadata: { index: 0, isWritable: true, value: input.metadata ?? null },
    mint: { index: 1, isWritable: false, value: input.mint ?? null },
    mintAuthority: {
      index: 2,
      isWritable: false,
      value: input.mintAuthority ?? null,
    },
    payer: { index: 3, isWritable: true, value: input.payer ?? null },
    updateAuthority: {
      index: 4,
      isWritable: false,
      value: input.updateAuthority ?? null,
    },
    systemProgram: {
      index: 5,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    rent: { index: 6, isWritable: false, value: input.rent ?? null },
  };

  // Arguments.
  const resolvedArgs: CreateMetadataAccountV3InstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.metadata.value) {
    resolvedAccounts.metadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.updateAuthority.value) {
    resolvedAccounts.updateAuthority.value = context.identity;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'omitted',
    programId
  );

  // Data.
  const data = getCreateMetadataAccountV3InstructionDataSerializer().serialize(
    resolvedArgs as CreateMetadataAccountV3InstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}