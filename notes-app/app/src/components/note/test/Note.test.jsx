import { describe, it, vitest } from 'vitest';
import Note from '../Note';
import { render, fireEvent } from '../../../utils/test-utils.tsx';

describe('Note', () => {
  const note = {
    content: 'this is a test',
    important: true,
  };
  it('the title is visible', () => {
    const component = render(<Note note={note} />);
    component.getByText(note.content);
    component.getByText('make not important');
  });

  it('call event habdler once', () => {
    const mockHanlder = vitest.fn();
    const component = render(<Note note={note} toggleImportance={mockHanlder} />);

    const checkBox = component.getByTestId('checkBox');

    fireEvent.click(checkBox);
    expect(mockHanlder).toBeCalledTimes(1);
  });
});
