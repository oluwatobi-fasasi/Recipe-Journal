import commentCounter from '../modules/CommentCounter.js';
import { getComment } from '../modules/Comments.js';

jest.mock('../modules/Comments.js', () => ({
  getComment: jest.fn(),
}));

describe('../modules/CommentCounter.js', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the comment counter element with the correct count', async () => {
    // Mock the getComment function to return a specific value
    const mockComments = ['comment1', 'comment2', 'comment3'];
    getComment.mockResolvedValue(mockComments);

    const mockElement = {
      textContent: '',
    };
    document.getElementById = jest.fn().mockReturnValue(mockElement);

    await commentCounter(123);

    expect(getComment).toHaveBeenCalledWith(123);

    expect(mockElement.textContent).toBe(`(${mockComments.length})`);
  });

  it('should not update the comment counter element if it does not exist', async () => {
    getComment.mockResolvedValue([]);

    document.getElementById = jest.fn().mockReturnValue(null);

    await commentCounter(123);

    expect(getComment).toHaveBeenCalledWith(123);

    expect(document.getElementById).toHaveBeenCalledWith('comment-counter');
    expect(document.getElementById('comment-counter')).toBeNull();
  });
});
