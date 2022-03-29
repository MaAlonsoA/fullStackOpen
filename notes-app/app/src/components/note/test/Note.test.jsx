import { describe, expect, it } from 'vitest';
import Note from '../Note';
import { render, screen } from '../../../utils/test-utils.tsx';

describe('Simple working test', () => {
  const note = {
    content: 'this is a test',
    important: true,
  };
  it('the title is visible', () => {
    const component = render(<Note note={note} />);
    component.getByText('this is a test');
    component.getByText('make not important');
  });
});
