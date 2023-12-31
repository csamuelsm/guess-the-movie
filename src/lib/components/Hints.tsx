import { Badge, Button, HStack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type HintsProps = {
    target:string
}

function Hints(props:HintsProps) {

  const [hints, setHints] = useState<string[]>([]);
  const [hintNumber, setHintNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getHints() {
        setLoading(true);
        let res = await fetch('/api/get_hints', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                target: props.target
            })
        });

        let data = await res.json();
        let hints:string[] = data['req'];

        setHints(hints);
        setLoading(false);
    }

    getHints();
  }, []);

  return (
    <HStack gap={3} marginY={2}>
        <Button colorScheme='purple' size='xs' isDisabled={!(hintNumber < 3) || loading} onClick={() => {
            let currHintNumber = hintNumber;
            setHintNumber(hintNumber+1);
        }}>
            Get Hint ({hintNumber}/3)
        </Button>
        {
            hints.map((el, idx) => {
                return (
                    <Badge fontSize='xs' fontWeight='bold' colorScheme='purple' display={
                        hintNumber > idx ? 'block' : 'none'
                    }>{idx + 1}. {el}</Badge>
                )
            })
        }
    </HStack>
  )
}

export default Hints