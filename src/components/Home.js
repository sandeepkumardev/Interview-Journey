import { useData } from '../context';
import HomePlaceholder from './HomePlaceholder';
import SingleList from './singleList';

function Home() {
  const { CompanyData } = useData();
  return (
    <div style={{ marginTop: '80px', overflow: 'hidden' }}>
      {CompanyData.map((company) => (
        <SingleList key={company._id} data={company} />
      ))}

      {!CompanyData.length && <HomePlaceholder />}
    </div>
  );
}

export default Home;
