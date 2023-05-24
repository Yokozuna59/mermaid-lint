grammar PieChart
import "./common";

entry PieChart:
    NEWLINE*
    "pie" (showData?="showData")? NEWLINE*
    TITLE_AND_ACCESSIBILITIES?
    ((NEWLINE+ sections+=Section)+ NEWLINE*)?
;

Section:
    label=STRING ":" value=NUMBER
;
