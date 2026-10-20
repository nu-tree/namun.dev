import { parseAsString, ParserBuilder, useQueryStates, UseQueryStatesOptions, Values } from 'nuqs';

type KeywordSearchStateMap = {
  keyword: ParserBuilder<string>;
  keywordName: ParserBuilder<string>;
};

export type KeywordSearchState = Values<{
  keyword: ParserBuilder<string>;
  keywordName: ParserBuilder<string>;
}>;

export function useKeywordSearchState(option?: Partial<UseQueryStatesOptions<KeywordSearchStateMap>>) {
  const [keywordOptions, setKeywordOptions] = useQueryStates(
    { keyword: parseAsString, keywordName: parseAsString },
    option
  );

  return { keywordOptions, setKeywordOptions };
}
