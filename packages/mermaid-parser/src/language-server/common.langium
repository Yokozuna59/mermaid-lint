/* terminals */
terminal NEWLINE: /\r?\n/;
terminal NUMBER returns number: /[0-9]+(\.[0-9]+)?/;
terminal STRING: /"[^"]*"/;

hidden terminal COMMENT: /%%(?!{(.|\r?\n)*}%%).*/;
hidden terminal WhiteSpaces: /[ \t]+/;
