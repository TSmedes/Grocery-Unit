import { useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();
  console.error(error);
  return (
    <div class="flex-col p-20 text-center">
      <h1 class="text-3xl leading-10 mt-10 font-bold">Oops! an unexpected error occured</h1>
      <p class="mt-12 text-xl">{error.statusText || error.message}</p>
    </div>
  );
}