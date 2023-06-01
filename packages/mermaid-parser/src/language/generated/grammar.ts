/******************************************************************************
 * This file was generated by langium-cli 1.2.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import { loadGrammarFromJson, Grammar } from 'langium';

let loadedMermaidGrammar: Grammar | undefined;
export const MermaidGrammar = (): Grammar => loadedMermaidGrammar ?? (loadedMermaidGrammar = loadGrammarFromJson(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "Mermaid",
  "imports": [],
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Mermaid",
      "entry": true,
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@1"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PieChart",
      "entry": false,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": [],
            "cardinality": "*"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@3"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "showData",
            "operator": "?=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": [],
            "cardinality": "*"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@5"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@6"
                    },
                    "arguments": [],
                    "cardinality": "+"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "sections",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@2"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@6"
                },
                "arguments": [],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Section",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "label",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@15"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@16"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "PIE",
      "definition": {
        "$type": "RegexToken",
        "regex": "pie(?!\\\\S)"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "SHOWDATA",
      "definition": {
        "$type": "RegexToken",
        "regex": "showData(?!\\\\S)"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "ParserRule",
      "name": "TITLE_AND_ACCESSIBILITIES",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "accDescr",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@12"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "accTitle",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@13"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "title",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@14"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "+"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": [],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "NEWLINE",
      "definition": {
        "$type": "RegexToken",
        "regex": "[\\\\n\\\\r]"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WHITESPACE",
      "definition": {
        "$type": "RegexToken",
        "regex": "[\\\\t\\\\r ]+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "YAML",
      "definition": {
        "$type": "RegexToken",
        "regex": "---\\\\s*[\\\\n\\\\r][\\\\s\\\\S]*?---\\\\s*(?!.)"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "MULTI_LINE_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "%%\\\\*[\\\\s\\\\S]*?\\\\*%%\\\\s*"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "DIRECTIVE",
      "definition": {
        "$type": "RegexToken",
        "regex": "%%{[\\\\s\\\\S]*?}%%\\\\s*"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SINGLE_LINE_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "%%[^\\\\n\\\\r]*\\\\s*"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "ACC_DESCR",
      "definition": {
        "$type": "RegexToken",
        "regex": "accDescr"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "ACC_TITLE",
      "definition": {
        "$type": "RegexToken",
        "regex": "accTitle"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "TITLE",
      "definition": {
        "$type": "RegexToken",
        "regex": "title"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\"[^\\"]*\\""
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "NUMBER",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "(0|[1-9][0-9]*)(\\\\.[0-9]+)?"
      },
      "fragment": false,
      "hidden": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "interfaces": [],
  "types": [],
  "usedGrammars": []
}`));
