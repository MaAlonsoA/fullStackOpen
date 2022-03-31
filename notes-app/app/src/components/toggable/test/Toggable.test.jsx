import { describe, it } from 'vitest';
import Toggable from '../Toggable';
import { render, fireEvent } from '../../../utils/test-utils.tsx';

describe('<Togglable />', () => {
  let component;
  const buttonLabel = 'show';

  beforeEach(() => {
    component = render(
      <Toggable buttonLabel={buttonLabel}>
        <div className="testDiv">testText</div>
      </Toggable>,
    );
  });

  it('renders its children', () => {
    component.getByText('testText');
  });

  it('renders its children but they are not visible', () => {
    const childElem = component.getByText('testText');
    expect(childElem.parentNode).toHaveStyle('display: none');
  });

  it('after toggle children must be shown', () => {
    fireEvent.click(component.getByText(buttonLabel));
    const childElem = component.getByText('testText');
    expect(childElem.parentNode).not.toHaveStyle('display: none');
  });
});
