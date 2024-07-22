export interface MenuItem {
  eventKey: string;
  label: string;
  style?: string;
  disabled?: boolean; // set false if item could be disabled. set true when disabled.
  hidden?: boolean; // set true if item should be hidden. set false when visible.
}
