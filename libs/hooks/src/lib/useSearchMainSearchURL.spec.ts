import { renderHook, act } from "@testing-library/react-hooks";
import { useSearchMainSearchURL } from "./useSearchMainSearchURL";

jest.mock("next/router", () => {
    const originalModule = jest.requireActual("next/router");

    return {
        __esModule: true,
        ...originalModule,
        useRouter: () => ({
            query: { search: "hello world" },
        }),
    };
});

describe("use search main search url", () => {
    it("should return load the query from url and update the main query with it", async () => {
        const setQuery = jest.fn((query: string) => {});

        const { result, waitForNextUpdate, rerender } = renderHook(({ query, setQuery }) => useSearchMainSearchURL(query, setQuery), {
            initialProps: { query: "", setQuery },
        });

        // await waitForNextUpdate();
        expect(setQuery).toHaveBeenCalled();

        // expect(result.current.query).toEqual("");
        // expect(result.current.hits).toEqual([]);

        // act(() => result.current.setQuery("test"));
        // await waitForNextUpdate();
        // expect(result.current.hits).toEqual(["test"]);
        // expect(result.current.query).toEqual("test");

        // act(() => result.current.setQuery("hello world"));
        // await waitForNextUpdate();
        // expect(result.current.hits).toEqual(["hello", "world"]);
        // expect(result.current.query).toEqual("hello world");

        // act(() => result.current.setQuery(""));
        // expect(result.current.hits).toEqual([]);
        // expect(result.current.query).toEqual("");
    });
});
