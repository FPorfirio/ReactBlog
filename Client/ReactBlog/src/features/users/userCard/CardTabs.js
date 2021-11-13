import React from 'react'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  Button,
  ButtonGroup,
  Text,
  Heading,
} from '@chakra-ui/react'
import { ReactComponent as AboutIcon } from '../../../assets/aboutIcon.svg'

const BoxInfo = ({ objInfo, boxTitle }) => {
  const objFields = Object.entries(objInfo)

  return (
    <div className="border-r border-b border-coral ">
      <Heading as="h2" size="sm" marginBottom="0.5rem">
        <Icon verticalAlign="bottom" w="5" h="5" as={AboutIcon} />
        <span>{boxTitle}</span>
      </Heading>

      {objFields.map((userFields, index) => (
        <div key={userFields[0]} className="ml-5">
          <Heading as="h3" fontSize="0.7rem">
            {userFields[0]}
          </Heading>
          <Text fontFamily="mono" fontSize="sm">
            {userFields[1]}
          </Text>
        </div>
      ))}
    </div>
  )
}

export const CardTabs = ({ accountInfo, personalInfo, activityHandler }) => {
  const btnRef = React.useRef()

  return (
    <Tabs isFitted>
      <TabList>
        <Tab>Details</Tab>
        <Tab>Activity</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="flex flex-col gap-3">
            <BoxInfo objInfo={personalInfo} boxTitle="About" />
            <BoxInfo objInfo={accountInfo} boxTitle="Account" />
          </div>
        </TabPanel>
        <TabPanel>
          <ButtonGroup variant="outline" colorScheme="blue">
            <Button ref={btnRef} onClick={activityHandler}>
              Posts
            </Button>
            <Button>Comments</Button>
          </ButtonGroup>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
