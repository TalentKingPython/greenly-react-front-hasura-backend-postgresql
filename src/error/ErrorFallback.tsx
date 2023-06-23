import { GreenlyLogo } from 'uiCore/components/GreenlyLogo';

export function ErrorFallback() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'block' }}>
      <div
        style={{
          width: '100vw',
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            width: '100vw',
            justifyContent: 'center',
            display: 'flex',
            paddingTop: '50px',
          }}
        >
          <GreenlyLogo />
        </div>

        <div
          style={{
            textAlign: 'left',
            marginTop: '50px',
            paddingLeft: '100px',
            paddingRight: '100px',
          }}
        >
          <h1 style={{ marginBottom: '20px' }}>Oops! Something went wrong.</h1>
          <p style={{ marginBottom: '20px' }}>
            Don't worry, we're on it! Our team is working hard to fix this issue
            and get you back to exploring the latest in sustainable technology.
          </p>
          <p style={{ marginBottom: '20px' }}>
            In the meantime, why not take a moment to learn about our commitment
            to the environment? We believe in using cutting-edge technology to
            create a better world for all, and we're always working to find new
            and innovative ways to reduce our impact on the planet.
          </p>
          <p style={{ marginBottom: '20px' }}>
            Thank you for your patience. We'll be back up and running soon!
          </p>
          <a href="/">Go back to home</a>
        </div>
      </div>
    </div>
  );
}
