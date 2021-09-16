// import React, { useMemo } from 'react'

// import numeral from 'numeral'
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardIcon,
//   Container,
//   Spacer,
// } from 'react-neu'
// import { useWallet } from 'use-wallet'

// import Label from '../../components/Label'
// import Value from '../../components/Value'
// import { bnToDec } from '../../utils'
// import { StyledSubtitle }  from '../../components/PageHeader'
// import useStaking from '../../hooks/useStaking'

// const Harvest: React.FC = () => {
//   const {
//     earnedHoneyPoolBalance,
//     isHarvesting,
//     onHarvest,    
//   } = useStaking()

//   const { status } = useWallet()

//   const HarvestAction = useMemo(() => {
//     if (status !== 'connected') {
//       return (
//         <Button
//           disabled
//           full
//           text="Claim"
//           variant="secondary"
//         />
//       )
//     }
//     if (!isHarvesting) {
//       return (
//         <Button
//           full
//           onClick={() => onHarvest()}
//           text="Claim"
//         />
//       )
//     }
//     if (isHarvesting) {
//       return (
//         <Button
//           disabled
//           full
//           text="Claiming..."
//           variant="secondary"
//         />
//       )
//     }
//   }, [
//     String(isHarvesting),
//     onHarvest,
//     status
//   ])

//   const formattedEarnedBalance = useMemo(() => {
//     const balance = earnedHoneyPoolBalance
//     if (balance) {
//       return numeral(bnToDec(balance)).format('0.00a')
//     } else {
//       return '--'
//     }
//   }, [earnedHoneyPoolBalance])

//   return (
//     <Card>
//       <Container size="sm">
//         <Spacer />
//         <StyledSubtitle>Earned Honey</StyledSubtitle>
//       </Container>
//       <CardIcon>🍯</CardIcon>
//       <CardContent>
//         <Box
//           alignItems="center"
//           column
//         >
//           <Value value={formattedEarnedBalance} />
//           <Label text="Claimable Honeys" />
//         </Box>
//       </CardContent>
//       <CardActions>
//         {HarvestAction}
//       </CardActions>
//     </Card>
//   )
// }

 export {}