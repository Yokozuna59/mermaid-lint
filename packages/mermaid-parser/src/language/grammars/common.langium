/* terminals */
// placeholder terminals
terminal ACC_DESCR: /accDescr/;
terminal ACC_TITLE: /accTitle/;
terminal EOF: /\z/;
terminal TITLE: /title/;

terminal NEWLINE: /\n/;
terminal NUMBER returns number: /[0-9]+(\.[0-9]+)?/;
terminal STRING: /"[^"]*"/;

// hidden terminals
hidden terminal COMMENT: /%%(?!{(.|\n)*}%%).*/;
hidden terminal WHITESPACE: /[ \r\t]+/;


/* fragments */
fragment DESCR_AND_TITLES:
    accDescr=ACC_DESCR & accTitle=ACC_TITLE & title=TITLE
    (EOF | NEWLINE+)
;
