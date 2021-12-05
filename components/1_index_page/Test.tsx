/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

// TAILWIND STYLED COMPONENTS
const StyledTwDiv = tw.div`

  border hover:border-b-gray-900

`;

// REGULAR EMOTION STYLED COMPONNTS
const StyledDiv = styled.div`
  background-color: blanchedalmond;
`;

const TestComponent: FC = () => {
  return (
    // PARSING TAILWIND INTO CSS
    <section css={[tw`bg-gray-200`, tw`hover:text-blue-600`]}>
      <h1 css={[tw`text-5xl border-2`]}>The Inter typeface family</h1>
      <h1 className="blah">The Inter typeface family</h1>
      <div
        // REGULAR EMOTION
        css={css`
          border: crimson solid 1px;
          & h1 {
            font-size: 4em;
          }
          & p {
            color: #421f35;
          }
        `}
      >
        <h1>Test</h1>
        <p>Lorem ipsum</p>
        <StyledTwDiv>Hello World</StyledTwDiv>
        <StyledDiv>Hello world</StyledDiv>
      </div>
      <aside
        css={css`
          font-size: 3rem;

          /*  YOU CAN PARSE TAILWIND CLASSES TO CSS */
          ${tw`border-green-500 border-4 `}
        `}
      >
        <h1 css={[tw`font-mono`]}>Lorem Blorem</h1>
        <h1 css={[tw`font-serif`]}>Lorem Blorem</h1>
      </aside>
      <section
        css={css`
          & h1 {
            ${tw`text-4xl`}
          }
        `}
      >
        <h1 css={[tw`bg-auto`]}>Testing Font Family</h1>
      </section>
      <footer
        css={css`
          font-size: 4rem;
          /* YOU CAN ALSO REFERENCE STYLES FROM YOUR THEME */

          background-color: ${theme`colors.electric`};

          color: ${theme`colors.bledoliko`};
        `}
      >
        <h2>Hello World</h2>
      </footer>
    </section>
  );
};

export default TestComponent;
