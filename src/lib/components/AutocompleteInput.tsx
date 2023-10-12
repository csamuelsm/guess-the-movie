import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Input, Flex, Text, Popover, PopoverAnchor, PopoverContent, PopoverBody, VStack, Box, StackDivider, Spinner, HStack, Button, Progress, ProgressLabel, Stack } from '@chakra-ui/react';
//import { getVectorsFromData } from '../utils';

import { buildSearch } from 'search.ts';
import { SearchResult } from 'search.ts';

import binarySearch from '../utils/binarySearch';
import { getVectorsFromData } from '../utils';

var similarity = require( 'compute-cosine-similarity' );

type AutocompleteProps = {
    word: string
}

function getColorScheme(sim:number) {
    if (sim == 100) {
        //TODO: end the game and show CONGRATS!
        return 'blue'
    }else if (sim >= 50) {
        return 'green';
    } else if (sim < 50 && sim >= 25) {
        return 'yellow';
    } else if (sim < 25) {
        return 'pink';
    }
}

function transformValue(sim:number, biggest_sim:number) {
    return 99*sim/biggest_sim;
}

function AutocompleteInput( props:AutocompleteProps ) {
  const [value, setValue] = useState<string>('');
  const handleChange = (event:ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const inputRef = useRef(null);

  const [search, setSearch] = useState<React.JSX.Element[]>([]);
  const [searchData, setSearchData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<'movies'|'organizing'|'vectors'|'word2vec'|null>(null);
  const [allWords, setAllWords] = useState(null);
  const [currWordData, setCurrWordData] = useState();
  const [guess, setGuess] = useState<string|null>(null);
  const [similarities, setSimilarities] = useState<{
    word:string,
    similarity:number
  }[]>([]);
  const [mostSimilar, setMostSimilar] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    const delaySearch = setTimeout(() => {
        if (value.length >= 2) {
            setPopoverOpen(true);
            var results = [];

            const searcher = buildSearch([value]);
            //console.log('Searching data...');
            let query:SearchResult[]|any[] = searcher.search(searchData);
            for (let i = 0; i < query.length; i++) {
                try {
                    let start = query[i]['start'];
                    let end = query[i]['end'];
                    let searchDataLen = searchData.length;
                    while (start > 0) {
                        if (searchData[start] != '\n' && start > 0) start--;
                        else break;
                    }
                    //console.log('start', start);
                    while (end < searchDataLen) {
                        if (searchData[end] != "\n" && end < searchDataLen) end++;
                        else break;
                    }
                    //console.log('end', end);
                    results.push(
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            key={searchData.slice(start+1, end).replaceAll('"', '')}
                            >
                            <Button variant='ghost' size="sm" onClick={() => {
                                setValue('');
                                setGuess(searchData.slice(start+1, end).replaceAll('"', ''));
                            }}>
                                <Text>{searchData.slice(start+1, end).replaceAll('"', '')}</Text>
                            </Button>
                        </Box>
                    );
                    setSearch(results);
                    //console.log(start, end, searchData.slice(start+1, end));
                } catch(e) {
                    //TODO: DISPLAY ERROR MESSAGE
                    console.log((e as Error).message);
                }
            }
            setIsLoading(false);
        } else {
            setSearch([]);
            setPopoverOpen(false);
        }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [value]);

  useEffect(() => {
    async function getData() {
        setStatus('movies');
        const data = await fetch('/api/get_plain');
        const res = await data.json();
        setStatus('organizing');
        const searchData:string = res.req;
        //console.log(searchData);
        setSearchData(searchData);
        //setStatus('vectors');

        // code to get the fetch the word2vec data
        /*const vectors = await fetch('/api/vectors');
        const vector_data = await vectors.json();
        //console.log(vector_data);
        const w2v = await getVectorsFromData(vector_data.vectors, 100);
        w2v.sort(function(a, b) {
            //@ts-ignore
            if (a.word < b.word) return -1;
            //@ts-ignore
            if (a.word > b.word) return 1;
            return 0;
        })
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(w2v));
        var downloadLink = document.createElement("a");
        downloadLink.innerHTML = "Download JSON";
        downloadLink.setAttribute("href", dataStr);
        downloadLink.setAttribute("download", "sortedW2V.json");
        downloadLink.click();*/
        // end of code to fetch the word2vec data

        setStatus('vectors');
        let vectorData = await fetch('/api/sortedVectors');
        let vectors = await vectorData.json();
        //console.log(vectors);
        setAllWords(vectors.vectors);
        let currWord = binarySearch(vectors.vectors, props.word);
        if (currWord !== -1) {
            //@ts-ignore
            setCurrWordData(currWord);
        }

        // finding the closest movie to the current

        let biggest_sim = -999;
        for (let i = 0; i < vectors.vectors.length; i++) {
            //@ts-ignore
            //console.log(vectors.vectors[i].vector, currWord.vector)
            //@ts-ignore
            let sim = similarity(vectors.vectors[i].vector, currWord.vector);
            //@ts-ignore
            if (sim > biggest_sim && sim != 1)
                biggest_sim = sim
        }
        //console.log('biggest_sim', biggest_sim)
        setMostSimilar(biggest_sim*100);
        setStatus(null);
    }

    getData()
  }, [])

  useEffect(() => {
    //console.log('guess changed', guess, allWords, currWordData)
    if (guess && allWords && currWordData) {
        console.log('checking guess');
        let guessData = binarySearch(allWords, guess);
        let newGuess = {
            //@ts-ignore
            word: guessData.word,
            //@ts-ignore
            similarity: Math.abs((similarity(currWordData.vector, guessData.vector)*100).toFixed(1)),
        }
        //console.log('guessData', guessData);
        if (guessData !== -1 && !similarities.includes(newGuess)) {
            const similarityArray = [...similarities, newGuess].sort((a, b) => {
                if (a.similarity < b.similarity) return 1;
                if (a.similarity > b.similarity) return -1;
                return 0;
            });
            //@ts-ignore
            setSimilarities(similarityArray);
            //@ts-ignore
            //console.log('similarity:',(similarity(currWordData.vector, guessData.vector)*100).toFixed(1));
        } //TODO: else SHOW ERROR MESSAGE
    }
  }, [guess]);

  return (
    <Flex
        flexDirection="column"
        w="100%"
        justifyContent={status === null ? "flex-start" : "center"}
        minHeight="70vh"
        >
        {status != null &&
            <VStack alignItems="center" justifyContent="center" textAlign="center">
                <Spinner />
                <Text fontSize="sm">
                    {status === 'movies' && 'Getting movies data...'}
                    {status === 'organizing' && 'Organizing movies data...'}
                    {status === 'vectors' && 'Obtaining similarities data...'}
                    {status === 'word2vec' && 'Structuring similarities data...'}
                </Text>
                {status === 'vectors' && <Text fontSize="xs" >This may take a while.</Text>}
            </VStack>}

        {status === null &&
            <Popover
                isOpen={popoverOpen}
                closeOnBlur={false}
                isLazy
                lazyBehavior='keepMounted'
                initialFocusRef={inputRef}
                variant="responsive"
            >
                <PopoverAnchor>
                    <Input
                    placeholder='Type a movie or a tag'
                    variant="filled"
                    value={value}
                    onChange={handleChange}
                    ref={inputRef}></Input>
                </PopoverAnchor>

                <PopoverContent
                    minW={{ base: "100%", lg: "max-content" }}
                    maxH={500}
                    overflowY="scroll"
                >
                    <PopoverBody>
                        <VStack
                        divider={<StackDivider borderColor='gray.200' />}
                        spacing={2}
                        align='stretch'>
                            {isLoading && <HStack alignItems="center" justifyContent="center"><Spinner /><Text fontSize="sm">Searching movies...</Text></HStack>}
                            {!isLoading && search}
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        }
        <Stack spacing={2} marginY={5} w="100%">
            {similarities.map((el) => {
                return (
                    <Progress value={transformValue(el.similarity, mostSimilar)}
                        colorScheme={getColorScheme(transformValue(el.similarity, mostSimilar))}
                        height={30}
                        borderRadius={5}
                        border={el.word === guess ? "2px solid" : "none"}
                        borderColor={el.word === guess ? "blue.500" : "none"}
                        >
                        <ProgressLabel color="gray.900" fontSize="sm" textAlign="left" marginX={3} >{el.word}</ProgressLabel>
                    </Progress>
                )
            })}
        </Stack>
    </Flex>
  )
}

export default AutocompleteInput