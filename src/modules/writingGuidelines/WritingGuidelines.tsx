import { withTopBar } from 'modules/decorators/withTopBar';
import GeneralGuidelines from './components/GeneralGuidelines/GeneralGuidelines';
import Introduction from './components/Introduction/Introduction';

const WritingGuidelines = () => {
  return (
    <>
      <Introduction />
      <GeneralGuidelines />
    </>
  );
};

export default withTopBar(WritingGuidelines, {
  navbar: true,
  categoryBar: true,
});
