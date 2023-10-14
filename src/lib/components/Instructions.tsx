import React, { useState } from 'react'
import { Button, Flex, Heading, Text, useColorMode } from '@chakra-ui/react'
import { FaInfoCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Instructions() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [currInstr, setCurrInstr] = useState<number>(1);

  return (
    <Flex padding={4} marginY={3} borderRadius={8} flexDirection="column"
        background={
            colorMode === 'dark' ? "gray.700" : "gray.100"
        }>
        <Heading as="h3" size="md" display="flex" flexDirection="row" alignItems="center" >
            <FaInfoCircle style={{
                marginRight: "3px"
            }} /> How to play
        </Heading>

        {currInstr === 1 &&
            <>
                <Text marginY={3}>
                    The objective of the game is to <u><b>discover the secret movie</b></u> of the day. To do this, you must guess movies that you think are similar to the secret movie. You can guess as many times as you want.
                    Type your guess in the above text input and selected the movie you want from the list.
                </Text>
            </>
        }

        {currInstr === 2 &&
            <Text marginY={3}>
                An artificial intelligence algorithm will tell you <u><b>how similar</b></u> the movies you guessed are to the secret movie. It was trained on a large set of movies and calculated the similarity between movies <u><b>based on several tags</b></u> users assigned to each movie.
            </Text>
        }

        {currInstr === 3 &&
            <Text marginY={3}>
                <b><u>Obs.<sup>1</sup></u>: </b> The database contains movies released <u><b>up until 2018 and some from 2019</b></u>, so the search won't find any movies released after this and the secret movie is always a movie released up to this date.
                Also, some little known movies were removed from the database.
            </Text>
        }

        {currInstr === 4 &&
            <Text marginY={3}>
                <b><u>Obs.<sup>2</sup></u>: </b> If you <u><b>search for some movie that starts with an article</b></u>, for example 'The Devil Wears Prada', it may not appear because the movie can be in the database as 'Devil Wears Prada, The'.
                So if you search for a movie like this and it doesn't appear, <u><b>try again omitting the article</b></u>.
            </Text>
        }

        {currInstr === 5 &&
            <>
                <Text marginY={3}>
                    You can give up at any time, but another game will be available only in the next day.
                    You can also play this game with a group, for example one person guessing a movie at each round.
                    Finally and most important, <u><b>have fun and happy playing!</b></u>
                </Text>
            </>
        }
        <Flex w='100%'>
            <Button marginRight='auto' isDisabled={currInstr == 1}
            onClick={() => {
                if (currInstr > 1) {
                    setCurrInstr(currInstr - 1);
                }
            }}
            leftIcon={<FaArrowLeft />}
            >
                Previous
            </Button>
            <Button marginLeft='auto' isDisabled={currInstr == 5}
            onClick={() => {
                if (currInstr < 5) {
                    setCurrInstr(currInstr + 1);
                }
            }}
            rightIcon={<FaArrowRight />}
            >
                Next
            </Button>
        </Flex>
    </Flex>
  )
}

export default Instructions