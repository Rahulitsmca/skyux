---
name: Alert
icon: bell
summary: The alert component displays a SKY UX-themed Bootstrap alert.
---

The alert component displays a SKY UX-themed Bootstrap alert. It includes an option to let users dismiss the alert with a close button. For information about the Bootstrap alert, see the [Bootstrap documentation](http://getbootstrap.com/components/#alerts).

### Alert settings ###
    - `bb-alert` &mdash; Creates a SKY UX-themed Bootstrap alert.
        - `bb-alert-type` &mdash; Specifies a style for the alert. The valid options are `success`, `info`, `warning`, and `danger`. *(Default: `warning`)*
        - `bb-alert-closeable` &mdash; *(Optional.)* Specifies a Boolean value to indicate whether users can dismiss the alert. *(Default: `false`)*
        - `bb-alert-closed` &mdash; *(Optional.)* For alerts that are closeable, indicates whether the alert is closed. *(Default: `false`)*