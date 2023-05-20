grammar PieChart
import "./common";

entry PieChart:
    NEWLINE*
    "pie" (showData?="showData")? NEWLINE*
    DESCR_AND_TITLES?
    sections+=Section*
;

Section:
    label=STRING ":" value=NUMBER (EOF | NEWLINE+)
;
