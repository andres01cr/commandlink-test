import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;