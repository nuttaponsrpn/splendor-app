import { FC, useState } from "react";
import DevelopmentCards, { DevelopmentCard } from "./DevelopmentCard";
import { Player } from "./PlayerBoard";
import { Box, Button, Dialog, styled } from "@mui/material";

interface DevelopmentTilesProps {
  isPlayerTurn: boolean;
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
  isPlayerTurn,
  player,
  developmentCards,
  onCardReserve,
  onCardPurchase,
  isDisplayPurchaseCard,
}) => {
  const level1 = developmentCards.filter(({ level }) => level === 1);
  const level2 = developmentCards.filter(({ level }) => level === 2);
  const level3 = developmentCards.filter(({ level }) => level === 3);
  const isDisplayReserveCard = isPlayerTurn && player.reservedCards.length < 3;
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
        <DevelopmentLevelWrapper>
          <DevelopmentLevelCard className="text-shadow">
            {Array(level)
              .fill("")
              .map((_, index) => (
                <span key={`${level}${index}`}>I</span>
              ))}
          </DevelopmentLevelCard>
        </DevelopmentLevelWrapper>

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
                sx={{ width: "100px" }}
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
                sx={{ width: "100px" }}
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
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    border-radius: 8px;
    gap: 4px;
    height: 106%;
    width: 95%;
    margin-right: 8px;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 100%;
    width: 100%;
    margin-right: 0px;
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
  width: 40px;
  font-family: "ui-monospace";
  letter-spacing: 0.5px;
  font-size: 30px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: 60px;
  }
`;

const DevelopmentCardDialog = styled(Box)`
  height: 230px;
  width: 150px;
  display: table !important;

  .card-cost {
    height: 30px !important;
    font-size: 20px !important;
  }

  .development-gem-type {
    margin-top: 10px;
    height: 35px;
  }
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

  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: ${({ width }) => (width ? width : "100%")};
    height: ${({ height }) => (height ? height : "100%")};
    background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : "inherit")};
  }
`;

const DialogDevelopmentMenu = styled(Box)`
  position: absolute;
  bottom: 0;
  right: -110px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DevelopmentLevelCard = styled(BlankCard)`
  display: flex !important;
  background-color: blanchedalmond;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 27px !important;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;
