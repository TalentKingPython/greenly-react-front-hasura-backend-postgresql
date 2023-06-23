import classNames from 'classnames';
import { Box, Grid, Typography } from '@material-ui/core';
import { useStyles } from 'modules/writingGuidelines/styles';
import { IGuideline } from 'modules/writingGuidelines/interfaces/IGuideline';
import GeneralGuidelineItem from './GeneralGuidelineItem';

const GUIDELINES: IGuideline[][] = [
  [
    {
      title: 'Keep Your Piece Between 450 and 3000 Words',
      body: 'Your article should be concise yet thorough. Articles should aim to be 450 words minimum, but we will accept high quality articles of shorter length. Longer content will increase the likelihood that your article will go viral.',
    },
    {
      title: 'Make a Killer Title',
      body: 'Craft a title that is concise and ‘sticky’. Something that will draw the eye of the reader and entice them to give your article a click. Some suggestions to make your title stand out are: 1) Include Numbers 2) Add attractive adjectives 3) Use call-to-action words.',
    },
  ],
  [
    {
      title: 'Craft a Unique Piece',
      body: 'Before you put pen to paper, you should ask yourself: ‘has this been written before?’ If the answer is yes, please consider finding a new topic or a new perspective on your desired topic. We are looking for articles that offer fresh and unique perspectives. ',
    },
    {
      title: "Don't rely solely on AI",
      body: 'In regards to advancements in AI writing: the new AI chatbot ChatGPT is revolutionizing how we research topics for article submissions. It is no doubt a powerful ally that can help you write your arguments more compellingly than normal. We will allow the use of ChatGPT to assist you in your research and outline processes, but with the caveat of emphasizing that it is not always factually accurate. Plagiarism is strongly denounced and we will be fact checking your articles. Submissions by one author that are continually written with erroneous facts will be barred. If you use ChatGPT, please do so knowing that it is an imperfect tool to rely on without some form of fact checking.',
    },
  ],
  [
    {
      title: 'Leave Out Promotional Content',
      body: 'Greenly is a platform to educate audiences about climate topics. Undoubtedly it is worthwhile to share your own projects and companies with readers. However we will not allow un-sponsored articles to promote businesses and will remove promotional content from your article.',
    },
    {
      title: 'Post Your Article on Social Media',
      body: 'We have found that posting about your article on social media outlets such as Linkedin and Facebook can help your article gain readership. If you want to improve the odds of going viral, post your article on social media once we’ve published it.',
    },
  ],
  [
    {
      title: 'Images and Media Are Worth it',
      body: 'Your featured image helps introduce readers to your articles and ideas. Take an image from anywhere on the web to help strengthen your piece.  Unsplash is our recommended site for stock photography if you’re feeling a little lost on where to search. If your featured image is not a public domain image be sure to cite the source.',
    },
    {
      title: 'Short Paragraphs are Preferable',
      body: 'You may have written a stellar academic article that you now want to share with the world.  But it’s important to remember that the most successful news and blog articles are a bit different from academic papers. They tend to use shorter paragraphs to grab the audience’s attention. Try to distill your arguments and ideas into their most concise form. You’ll be guaranteed to get more clicks if you do.',
    },
  ],
  [
    {
      title: 'Try to Make a Point with Each Sentence',
      body: 'Be sure to keep the focus of your article strong. Ask yourself as you’re editing: “does each sentence have a purpose that either advances my argument or adds factual evidence to help support my claim?”',
    },
    {
      title: 'Create a Bio for Your Profile',
      body: 'Readers love to know more about the writers they’re interacting with! Consider making a bio on your profile and adding your social media tags so readers have the chance to learn more about who you are and where you come from. Don’t just be a writer; be a member of the Greenly community.',
    },
  ],
  [
    {
      title: "Be Transparent About Your Article's Origins",
      body: 'We welcome writing that has already been published elsewhere. That said, we want readers to be informed about these article’s origins. If your work has appeared on other platforms, please be transparent and note this at the bottom of your publication when you submit.',
    },
    {
      title: 'Add Keywords',
      body: 'If you want your story to go viral, there are steps you can take to set yourself up for success. You should try to weave in keywords that will make your article rank higher in search results. Some of the keywords you can use include: ',
      tags: [
        'Biodiversity',
        'Global warming',
        'Green',
        'Epa',
        'Pollution',
        'Climate change',
        'Sustainability',
        'Agency',
        'Environmental science',
        'Environmental engineering',
        'Environmentalist',
      ],
    },
  ],
];

const GeneralGuidelines = () => {
  const classes = useStyles();
  const rootClassName = classNames(classes.root);
  const headerClassName = classNames(classes.headerTextStyling);

  return (
    <>
      <div className={rootClassName}>
        <Box display="flex" justifyContent="center">
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <Typography className={headerClassName} align="center">
                General Guidelines for Greenly Stories
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </div>
      {GUIDELINES.map((items, index) => {
        return items.map((guideline) => {
          return (
            <GeneralGuidelineItem
              key={guideline.title}
              title={guideline.title}
              body={guideline.body}
              tags={guideline.tags}
              isGray={!(index % 2 === 0)}
            />
          );
        });
      })}
    </>
  );
};

export default GeneralGuidelines;
