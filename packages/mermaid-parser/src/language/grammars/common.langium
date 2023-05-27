/* fragments */
fragment TITLE_AND_ACCESSIBILITIES:
    (accDescr=ACC_DESCR | accTitle=ACC_TITLE | title=TITLE)+
;

/* terminals */
// placeholder terminals
terminal ACC_DESCR: /accDescr/;
terminal ACC_TITLE: /accTitle/;
terminal TITLE: /title/;

terminal NEWLINE: /\n/;
terminal NUMBER returns number: /[0-9]+(\.[0-9]+)?/;
terminal STRING: /"[^"]*"/;

// hidden terminals
hidden terminal WHITESPACE: /[ \r\t]+/;
hidden terminal WHITESPACES: /\s/;
hidden terminal DIRECTIVE: "%%{" -> "}%%\n";
hidden terminal COMMENT: /%%.*/;
hidden terminal YAML: "---\n" -> "---\n";
