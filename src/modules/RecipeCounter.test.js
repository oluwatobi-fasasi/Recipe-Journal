import recipeCounter from './RecipeCounter.js';

describe('recipeCounter', () => {
  test('Return Recipe  Total Count', async () => {
    const mockResponse = {
      meals: [
        { name: 'Recipe 1' },
        { name: 'Recipe 2' },
        { name: 'Recipe 3' },
      ],
    };
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });
    global.fetch = mockFetch;
    const count = await recipeCounter();
    expect(count).toBe(3);
  });
});