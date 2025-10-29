# Custom Hooks

## useLoading

Hook để quản lý loading state và NProgress bar.

### Cách sử dụng:

```javascript
import { useLoading } from "../hooks/useLoading";
import Loading from "../components/Loading";

const MyComponent = () => {
  const { isLoading, withLoading } = useLoading();

  const fetchData = async () => {
    await withLoading(async () => {
      const response = await fetch("/api/data");
      const data = await response.json();
      return data;
    });
  };

  return (
    <div>
      {isLoading && <Loading />}
      <button onClick={fetchData}>Load Data</button>
    </div>
  );
};
```

### API:

- `isLoading`: Boolean state cho biết đang loading hay không
- `startLoading()`: Bắt đầu loading
- `stopLoading()`: Dừng loading
- `withLoading(asyncFunction)`: Tự động start/stop loading khi chạy async function

## useApiCall

Hook để gọi API với error handling.

### Cách sử dụng:

```javascript
import { useApiCall } from "../hooks/useApiCall";

const MyComponent = () => {
  const { loading, error, callApi } = useApiCall();

  const handleSubmit = async () => {
    const result = await callApi(() =>
      fetch("/api/submit").then((res) => res.json())
    );

    if (result) {
      console.log("Success:", result);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
```
