/* fragments */
fragment TITLE_AND_ACCESSIBILITIES:
    (accDescr=ACC_DESCR | accTitle=ACC_TITLE | title=TITLE)+
    NEWLINE*
;

/* terminals */
terminal NEWLINE: /[\n\r]/;
hidden terminal WHITESPACE: /[\t\r ]+/;

hidden terminal DIRECTIVE: /%%({[\w\W]*})%%\s*(?!.)/;
hidden terminal COMMENT: /%%.*\s*/;
hidden terminal YAML: /---\s*?[\n\r](.|\n)*---\s*(?!.)/;

terminal ACC_DESCR: /accDescr/;
terminal ACC_TITLE: /accTitle/;
terminal TITLE: /title/;

terminal STRING: /"[^"]*"/;
terminal NUMBER returns number: /(0|[1-9][0-9]*)(\.[0-9]+)?/;
