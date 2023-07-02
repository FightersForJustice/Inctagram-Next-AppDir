import { dictionary } from "../../../content";

function Page({ params }: { params: { lang: string } }) {
  return (
    <div>
      <h1>{dictionary[params.lang]?.homeHeader}11</h1>
      <p>{dictionary[params.lang]?.homeContent}22</p>
    </div>
  );
}

export default Page;
