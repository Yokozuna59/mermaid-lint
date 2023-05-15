grammar PieChart
import './common';

entry PieChart:
    'pie' (showData?='showData')? NEWLINE*
    ('title' title=STRING)? NEWLINE+
    sections+=Section*
;

Section:
    label=STRING ':' value=NUMBER NEWLINE+
;
