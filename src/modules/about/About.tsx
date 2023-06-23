import { AboutDescription } from 'modules/about/components/aboutDescription';
import { Team } from 'modules/about/components/team';
import { ContactFooter } from 'modules/about/components/contactFooter';
import { Contribute } from './components/contribute/Contribute';
import { GreenlyEditor } from './components/greenlyEditor/GreenlyEditor';
import { withTopBar } from 'modules/decorators/withTopBar';

function About() {
  return (
    <>
      <AboutDescription variant="primary" />
      <Team variant="primary" />
      <Contribute />
      <GreenlyEditor />
      <ContactFooter variant="primary" />
    </>
  );
}

export default withTopBar(About);
