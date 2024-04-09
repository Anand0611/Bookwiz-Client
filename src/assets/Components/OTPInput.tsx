import React, {useRef} from "react";
import {View, TextInput, Text } from "react-native";

type Props = { 
    code: string[];
    setCode : React.Dispatch<React.SetStateAction<string[]>>;
    maximumLength: number;

}