grammar PieChart
import "./common";

entry PieChart:
    NEWLINE*
    "pie" (showData?="showData")? NEWLINE*
    TITLE_AND_ACCESSIBILITIES?
    sections+=Section*
;

Section:
    label=STRING ":" value=NUMBER (EOF | NEWLINE+)
;
