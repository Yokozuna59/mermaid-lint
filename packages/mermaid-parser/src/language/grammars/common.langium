/* terminals */
// other terminals
terminal NEWLINE: /\n/;
terminal NUMBER returns number: /[0-9]+(\.[0-9]+)?/;
terminal STRING: /"[^"]*"/;

// hidden terminals
hidden terminal COMMENT: /%%(?!{(.|\n)*}%%).*/;
hidden terminal WHITESPACE: /[ \r\t]+/;
