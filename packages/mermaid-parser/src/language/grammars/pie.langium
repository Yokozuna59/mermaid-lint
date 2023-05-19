grammar PieChart
import "./common";

entry PieChart:
    NEWLINE*
    "pie" (showData?="showData")? NEWLINE*
    ("title" title=STRING NEWLINE*)?
    (sections+=Section (NEWLINE+ sections+=Section)* NEWLINE*)?
;

Section:
    label=STRING ":" value=NUMBER
;
