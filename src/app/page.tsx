"use client";

import { useEffect, useState } from "react";

  type Advocate = {
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[];
    yearsOfExperience: number;
    phoneNumber: number;
  };

  type Advocates = Advocate[];

const Th = (props: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th style={{ paddingRight: "10px" }} {...props} />
);

const Td = (props: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td style={{ textAlign: "center" }} {...props} />
);

const Tr = (props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    style={{
      marginBottom: "50px",
      backgroundColor: (props["data-row-index"] ?? 0) % 2 === 1 ? "#333333" : undefined, // Tailwind's green-200 hex
    }}
    {...props}
  />
);

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocates>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocates>([]);
  const [noResults, setNoResults] = useState(false);
  const fetchAdvocates = (searchTerm: string) => {
    console.log("filtering advocates...");
    const filteredAdvocates: Advocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
        String(advocate.yearsOfExperience).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(advocate.phoneNumber).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setNoResults(filteredAdvocates.length === 0);
    return filteredAdvocates;
  };
  
  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredAdvocates(fetchAdvocates(value));
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
    setNoResults(false);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <h2>Search</h2>
        <label htmlFor="search-input">
          Searching for: <output id="search-term">{searchTerm}</output>
        </label>
        <br />
        <br />
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
        <table style={{ tableLayout: "fixed", width: "100%" }}>
   {!noResults && <thead>
            <tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>City</Th>
              <Th>Degree</Th>
              <Th style={{ width: "50%" }}>Specialties</Th>
              <Th>Years of Experience</Th>
              <Th>Phone Number</Th>
            </tr>
          </thead>}
          <tbody>

          {filteredAdvocates.map((advocate, i) => {
            return (
              <Tr key={i} data-row-index={i}>
                <Td>{advocate.firstName}</Td>
                <Td>{advocate.lastName}</Td>
                <Td>{advocate.city}</Td>
                <Td>{advocate.degree}</Td>
                <Td>
                  {advocate.specialties.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </Td>
                <Td>{advocate.yearsOfExperience}</Td>
                <Td>{advocate.phoneNumber}</Td>
              </Tr>
            );
          })}
        </tbody>
      </table>
      {noResults && (
        <p style={{ textAlign: "center", width: "100%" }}>
          <em>
            Your search did not match any advocates.<br />
            Need help? Check out our <a style={{ color: "blue" }} href="https://www.solace.com/help">other tips</a> for searching on Solace
          </em>
        </p>
      )}
    </main>
  );
}
