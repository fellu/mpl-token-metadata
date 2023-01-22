/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  GetDataEnumKind,
  GetDataEnumKindContent,
  Option,
  PublicKey,
  Serializer,
} from '@lorisleiva/js-core';

export type ProgrammableConfig = { __kind: 'V1'; rule_set: Option<PublicKey> };

export function getProgrammableConfigSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<ProgrammableConfig> {
  const s = context.serializer;
  return s.dataEnum<ProgrammableConfig>(
    [
      [
        'V1',
        s.struct<GetDataEnumKindContent<ProgrammableConfig, 'V1'>>(
          [['rule_set', s.option(s.publicKey)]],
          'V1'
        ),
      ],
    ],
    undefined,
    'ProgrammableConfig'
  );
}

// Data Enum Helpers.
export function programmableConfig(
  kind: 'V1',
  data: GetDataEnumKindContent<ProgrammableConfig, 'V1'>
): GetDataEnumKind<ProgrammableConfig, 'V1'>;
export function programmableConfig<K extends ProgrammableConfig['__kind']>(
  kind: K,
  data?: any
): ProgrammableConfig & { __kind: K } {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}
export function isProgrammableConfig<K extends ProgrammableConfig['__kind']>(
  kind: K,
  value: ProgrammableConfig
): value is ProgrammableConfig & { __kind: K } {
  return value.__kind === kind;
}