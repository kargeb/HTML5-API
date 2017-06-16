<?php

if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES)) { // jeśli typ żądania to POST i zostały przesłane jakieś pliki

    $images = $_FILES["images"]; // zapisujemy tablicę plików utworzoną dzięki dodawaniu do FormData "images[]"
    $allowed_files = array("jpg", "png"); // dozwolone rozszerzenia plików
    $images_dir = "images/"; // ścieżka, gdzie zapisać przysłane pliki
    $errors = 0; // ilość błędów

    if(!empty($images)) { // jeśli mamy coś w tablicy ze zdjęciami

        foreach($images["name"] as $file => $name) { // iterujemy po wszystkich polach

            if( $images["error"][$file] > 0 || !in_array( pathinfo($name, PATHINFO_EXTENSION), $allowed_files) ) { // jeśli wystąpił jakiś błąd lub rozszerzenie pliku nie jest dozwolone
                $errors++; // zwiększamy ilość błędów
                continue; // i przechodzimy do kolejnej iteracji pętli
            } else { // w przeciwnym wypadku
                if( !move_uploaded_file($images["tmp_name"][$file], $images_dir . $name) ) { // przenosimy dodany plik do wybranego katalogu
                    $errors++; // jeśli przy przenoszeniu wystąpił błąd, zwiększamy liczbę błędów
                }
            }

        }

    }

    if($errors > 0) { // jeśli wystąpiły jakieś błędy
        echo json_encode(array( // odsyłamy zamienioną na string tablicę
            "error"   => true,
            "message" => "Wystąpił błąd!"
        ));
    } else { // w przeciwnym wypadku
        echo json_encode(array( // odsyłamy zamienioną na string tablicę
            "error"   => false,
            "message" => "Wysyłanie zakończone powodzeniem!"
        ));
    }

}

?>