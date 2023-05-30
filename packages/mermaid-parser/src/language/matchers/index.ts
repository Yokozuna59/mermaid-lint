export * from './accdescr';
export * from './acctitle';
export * from './title';

export type CustomMatcherReturn =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (RegExpExecArray & { payload?: any }) | null;
