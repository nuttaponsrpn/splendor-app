import { Button, Dialog, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { FC, useState } from "react";
import DevelopmentCards, { DevelopmentCard } from "./DevelopmentCard";
import { Player } from "./PlayerBoard";

interface DevelopmentTilesProps {
  player: Player;
  developmentCards: DevelopmentCard[];
  onCardReserve: (card: DevelopmentCard) => void;
  onCardPurchase: (card: DevelopmentCard) => void;
  isDisplayPurchaseCard: (card: DevelopmentCard, player: Player) => boolean;
}

interface CardLevelSectionProps {
  level: number;
  developmentCards: DevelopmentCard[];
  onCardReserve: (card: DevelopmentCard) => void;
}

const DevelopmentTiles: FC<DevelopmentTilesProps> = ({
  player,
  developmentCards,
  onCardReserve,
  onCardPurchase,
  isDisplayPurchaseCard,
}) => {
  const level1 = developmentCards.filter(({ level }) => level === 1);
  const level2 = developmentCards.filter(({ level }) => level === 2);
  const level3 = developmentCards.filter(({ level }) => level === 3);
  const isDisplayReserveCard = player.reservedCards.length < 3;
  const [selectCard, setSelectCard] = useState<DevelopmentCard>();

  function clearSelectCard() {
    setSelectCard(undefined);
  }

  const CardLevelSection: FC<CardLevelSectionProps> = ({
    level,
    developmentCards,
  }) => {
    const displayDevCard = developmentCards.slice(0, 4);
    const blankCard =
      displayDevCard.length < 4
        ? Array(4 - displayDevCard.length).fill("")
        : [];

    function handleDevelopmentCardClick(card: DevelopmentCard) {
      setSelectCard(card);
    }

    return (
      <CardLevelBox>
        {/* Development Level */}
        {/* <DevelopmentLevelWrapper>
          <DevelopmentLevelCard>
            <div>Level</div>
            <div>{level}</div>
          </DevelopmentLevelCard>
        </DevelopmentLevelWrapper> */}

        {/* Development Card */}
        {displayDevCard.map((card, index) => (
          <DevelopmentCardWrapper
            key={index}
            onClick={() => handleDevelopmentCardClick(card)}
          >
            <DevelopmentCards developmentCard={card} key={card.id} />
          </DevelopmentCardWrapper>
        ))}

        {/* Blank Card */}
        {blankCard.map((_, index) => (
          <DevelopmentCardWrapper key={index}>
            <BlankCard />
          </DevelopmentCardWrapper>
        ))}
      </CardLevelBox>
    );
  };

  return (
    <DevelopmentCardsContainer className="development-tiles-container">
      <CardLevelSection
        level={3}
        developmentCards={level3}
        onCardReserve={onCardReserve}
      />
      <CardLevelSection
        level={2}
        developmentCards={level2}
        onCardReserve={onCardReserve}
      />
      <CardLevelSection
        level={1}
        developmentCards={level1}
        onCardReserve={onCardReserve}
      />

      {!!selectCard && (
        <Dialog
          open={!!selectCard}
          onClose={clearSelectCard}
          PaperComponent={DevelopmentCardDialog}
        >
          <DevelopmentCards developmentCard={selectCard} />
          <DialogDevelopmentMenu>
            {isDisplayPurchaseCard(selectCard, player) && (
              <Button
                variant="contained"
                onClick={() => {
                  onCardPurchase(selectCard);
                  clearSelectCard();
                }}
              >
                Purchase
              </Button>
            )}
            {isDisplayReserveCard && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onCardReserve(selectCard);
                  clearSelectCard();
                }}
              >
                Reserve
              </Button>
            )}
          </DialogDevelopmentMenu>
        </Dialog>
      )}
    </DevelopmentCardsContainer>
  );
};

export default DevelopmentTiles;

const DevelopmentCardsContainer = styled(Box)`
  height: 70%;

  ${({ theme }) => theme.breakpoints.up("md")} {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    gap: 4px;
    height: 100%;
    width: 55%;
  }
`;

const CardLevelBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  height: 33%;
  width: 100%;
`;

const DevelopmentCardWrapper = styled(Box)`
  height: 100%;
  flex: 1;
`;

const DevelopmentLevelWrapper = styled(Box)`
  height: 100%;
  width: 12%;
`;

const DevelopmentCardDialog = styled(Box)`
  height: 230px;
  width: 180px;
  display: table !important;
`;

export const BlankCard = styled(DevelopmentCardWrapper)<{
  width?: string;
  height?: string;
  bgcolor?: string;
}>`
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: ${({ width }) => (width ? width : "100%")};
    height: ${({ height }) => (height ? height : "100%")};
    background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : "inherit")};
  }
`;

const DialogDevelopmentMenu = styled(Box)`
  position: absolute;
  bottom: 0;
  right: -130px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DevelopmentLevelCard = styled(BlankCard)`
  display: flex !important;
  background-color: blanchedalmond;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 26px;
`;
