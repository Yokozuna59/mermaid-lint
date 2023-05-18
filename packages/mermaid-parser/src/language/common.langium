/* terminals */
terminal NEWLINE: /\n/;
terminal NUMBER returns number: /[0-9]+(\.[0-9]+)?/;
terminal STRING: /"[^"]*"/;

hidden terminal COMMENT: /%%(?!{(.|\r?\n)*}%%).*/;
hidden terminal WHITESPACE: /[ \r\t]+/;
